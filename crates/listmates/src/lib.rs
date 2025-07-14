use askama::Template;
use axum::Router;
use axum::extract::{Path, State};
use axum::response::{Html, IntoResponse};
use axum::routing::get;
use database::Pool;
use database::listmates::{List, ListModel, select_list_with_items, select_lists};
use error_handling::AppError;
use uuid::Uuid;

pub fn router(pool: Pool) -> Router {
    Router::new()
        .route("/", get(get_lists))
        .route("/lists/{id}", get(get_list))
        .with_state(pool)
}

#[derive(Template)]
#[template(path = "home.html")]
struct HomeTemplate {
    lists: Vec<List>,
}

#[derive(Template)]
#[template(path = "list.html")]
struct ListTemplate {
    list: ListModel,
}

async fn get_lists(State(pool): State<Pool>) -> Result<impl IntoResponse, AppError> {
    let lists = select_lists(pool).await.map_err(AppError::from)?;

    let template = HomeTemplate { lists };
    Ok(Html(template.render()?))
}

async fn get_list(
    Path(id): Path<Uuid>,
    State(pool): State<Pool>,
) -> Result<impl IntoResponse, AppError> {
    println!("{id}");
    let list = select_list_with_items(id, pool)
        .await
        .map_err(AppError::from)?;

    tracing::debug!("List: {:?}", &list);
    let template = ListTemplate { list };
    Ok(Html(template.render()?))
}

// Any filter defined in the module `filters` is accessible in your template.
mod filters {
    // This filter requires a `usize` input when called in templates
    pub fn or_empty<T: std::fmt::Display>(
        arg: &Option<T>,
        _: &dyn askama::Values,
    ) -> askama::Result<String> {
        Ok(match arg {
            Some(t) => t.to_string(),
            None => String::new(),
        })
    }
}
