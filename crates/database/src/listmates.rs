use serde::Serialize;
use sqlx::{Pool, Postgres};
use uuid::Uuid;

#[derive(Debug, sqlx::Type, Serialize)]
pub struct List {
    pub id: Uuid,
    pub name: String,
    pub description: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
    pub deleted_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Serialize)]
pub struct ListModel {
    pub id: Uuid,
    pub name: String,
    pub description: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
    pub deleted_at: Option<chrono::DateTime<chrono::Utc>>,
    pub items: Vec<ListItem>,
}

#[derive(Debug, sqlx::Type, Serialize)]
pub struct ListItem {
    pub id: Uuid,
    pub list_id: Uuid,
    pub description: String,
    pub status: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
    pub deleted_at: Option<chrono::DateTime<chrono::Utc>>,
}

pub async fn select_lists(pool: Pool<Postgres>) -> Result<Vec<List>, sqlx::Error> {
    sqlx::query_as!(
        List,
        "
        SELECT * FROM listmates.list
        "
    )
    .fetch_all(&pool)
    .await
}

pub async fn select_list(id: Uuid, pool: Pool<Postgres>) -> Result<List, sqlx::Error> {
    sqlx::query_as!(
        List,
        "
        SELECT * FROM listmates.list WHERE id = $1
        ",
        id
    )
    .fetch_one(&pool)
    .await
}

pub async fn select_list_with_items(
    id: Uuid,
    pool: Pool<Postgres>,
) -> Result<ListModel, sqlx::Error> {
    let list = sqlx::query_as!(
        List,
        r#"
        SELECT * FROM listmates.list
        WHERE id = $1
        "#,
        id
    )
    .fetch_one(&pool)
    .await?;

    let items = sqlx::query_as!(
        ListItem,
        r#"
        SELECT * FROM listmates.list_item
        WHERE list_id = $1
        "#,
        id
    )
    .fetch_all(&pool)
    .await?;

    Ok(ListModel {
        id: list.id,
        name: list.name,
        description: list.description,
        created_at: list.created_at,
        updated_at: list.updated_at,
        deleted_at: list.deleted_at,
        items: items,
    })
}
