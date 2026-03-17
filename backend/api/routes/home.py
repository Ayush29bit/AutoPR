from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Welcome to the AutoPR API. Visit /docs for API documentation."}