from fastapi import APIRouter
from pydantic import BaseModel
from app.services.elasticsearch_service import search_similar
from app.services.elasticsearch_service import index_event
from app.repositories.event_repository import EventRepository
from app.services.simulation_service import simulate_response
from app.services.simulation_service import simulate_response
from app.services.elasticsearch_service import search_events
from app.models.analysis import SimulationRequest
from datetime import datetime, timezone
from app.services.news_service import get_latest_news
router = APIRouter()

class EventRequest(BaseModel):
    event: str

@router.post("/analyze")
def analyze(request: EventRequest):

    result = simulate_response(
        request.event
    )

    now = datetime.now(timezone.utc)
    
    EventRepository.create(
        {
            "event_text": request.event,
            "response": result,
            "created_at": now
        }
    )

    risk_score = result.get("confidence_score", 50)
    crisis_level = result.get("crisis_level", "Medium")

    index_event({
        "event_text": request.event,
        "risk_score": risk_score,
        "crisis_level": crisis_level,
        "created_at": now.isoformat()
    })
    return result

@router.get("/events")
def get_events():

    events = EventRepository.get_all()

    for event in events:
        event["_id"] = str(event["_id"])

    return {
        "events": events
    }

@router.post("/simulate")
def simulate(request: SimulationRequest):

    result = simulate_response(
        request.event
    )

    return result

@router.get("/search-events")
def search_events_endpoint(q: str):
    return {
        "results": search_events(q)
    }

@router.get("/events/search")
def search_events(q: str):

    results = search_similar(q)

    return {
        "results": [
            hit["_source"]
            for hit in results["hits"]["hits"]
        ]
    }

@router.get("/ingest-news")
def ingest_news():

    news = get_latest_news()

    if not news:
        return {
            "error": "No news found"
        }

    event_text = f"""
    {news["title"]}

    {news["summary"]}
    """

    try:
        result = simulate_response(event_text)

    except Exception as e:
        print(e)

        result = {
            "crisis_level": "Critical",
            "executive_summary": event_text,
            "recommended_strategy": {
                "name": "Fallback Strategy",
                "reason": "Gemini unavailable"
            },
            "expected_outcome": {
                "delay_reduction_percent": 0,
                "cost_saving_percent": 0,
                "risk_reduction_percent": 0
            },
            "top_actions": [],
            "supply_chain_impact": {
                "delay_days": 0,
                "cost_increase_percent": 0
            },
            "recommended_hubs": [],
            "secondary_risks": [],
            "confidence_score": 0
        }

    now = datetime.now(timezone.utc)

    EventRepository.create(
        {
            "event_text": event_text,
            "response": result,
            "created_at": now
        }
    )

    index_event({
        "event_text": event_text,
        "risk_score": result.get("confidence_score", 50),
        "crisis_level": result.get("crisis_level", "Medium"),
        "created_at": now.isoformat()
    })

    return {
        "news": news["title"],
        "analysis": result
    }