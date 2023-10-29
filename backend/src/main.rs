mod db;
mod models;

use actix_web::{get, web, App, HttpResponse, HttpServer};
use mongodb::Client;

use db::{add_user, init_db};

#[get("/")]
async fn index() -> actix_web::HttpResponse {
    HttpResponse::Ok().body("Hello there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri: &str = "mongodb://localhost:27017";

    let client: Client = Client::with_uri_str(uri)
        .await
        .expect("Failed to connect to DB!");

    init_db(&client).await;

    println!("Listening on port 8000!");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .service(index)
            .service(add_user)
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
