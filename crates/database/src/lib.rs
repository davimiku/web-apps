use sqlx::postgres::PgPoolOptions;
use std::time::Duration;

pub mod listmates;

pub type Pool = sqlx::PgPool;

pub async fn connect() -> Result<Pool, sqlx::Error> {
    PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(3))
        .connect("postgres://davidmikulis@localhost/web_apps")
        .await
}
