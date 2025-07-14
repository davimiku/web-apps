use axum::Router;
use axum::response::{Html, IntoResponse};
use axum::routing::get;
use database::Pool;

pub fn router(pool: Pool) -> Router {
    Router::new().route("/", get(home)).with_state(pool)
}

async fn home() -> impl IntoResponse {
    Html("<h1>Newsletter home</h1>")
}
