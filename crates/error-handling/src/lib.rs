use askama::Template;
use axum::http::StatusCode;
use axum::response::{Html, IntoResponse, Response};

#[derive(Debug, displaydoc::Display, thiserror::Error)]
pub enum AppError {
    /// Failed to read from the database
    DatabaseError(#[from] sqlx::Error),
    /// could not render template
    Render(#[from] askama::Error),
}

#[derive(Debug, Template)]
#[template(path = "error.html")]
struct ErrorTemplate {}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, template) = match &self {
            AppError::Render(_) => (StatusCode::INTERNAL_SERVER_ERROR, ErrorTemplate {}),
            AppError::DatabaseError(error) => match error {
                sqlx::Error::RowNotFound => (StatusCode::NOT_FOUND, ErrorTemplate {}),
                _ => (StatusCode::INTERNAL_SERVER_ERROR, ErrorTemplate {}),
            },
        };
        match template.render() {
            Ok(body) => (status, Html(body)).into_response(),
            Err(_) => (status, "Error rendering Error Template").into_response(),
        }
    }
}
