use actix_web::{post, web, HttpResponse};
use bcrypt::{hash, verify};
use mongodb::{bson::doc, Client, Collection};
use serde_json::json;

use crate::models::User;

const DB_NAME: &str = "ecommdb";

#[post("/add-user")]
pub async fn add_user(client: web::Data<Client>, form: web::Form<User>) -> HttpResponse {
    let collection: Collection<User> = client.database(DB_NAME).collection("users");

    match collection.find_one(doc! {"email": &form.email}, None).await {
        Ok(Some(user)) => HttpResponse::Ok().json(json!({"user": user, "success": false})),
        Ok(None) => {
            let hashed_pass: String = hash(&form.password, 12).unwrap();
            let user = User {
                email: String::from(&form.email),
                password: hashed_pass,
            };

            collection.insert_one(user.clone(), None).await.unwrap();
            HttpResponse::Ok().json(json!({"user": user, "success": true}))
        }
        Err(error) => {
            println!("An Error Occurred!\n{}", error);
            HttpResponse::InternalServerError().body("An Error Occurred while creating user!")
        }
    }
}

#[post("/login")]
pub async fn authenticate_user(client: web::Data<Client>, form: web::Form<User>) -> HttpResponse {
    let db: Collection<User> = client.database(DB_NAME).collection("users");

    match db.find_one(doc! { "email": &form.email }, None).await {
        Ok(Some(user)) => {
            match verify(&form.password, &user.password) {
                Ok(status) => match status {
                    true => HttpResponse::Ok()
                        .json(json!({"email": &user.email.clone(), "success": true})),
                    false => HttpResponse::Ok()
                        .json(json!({"email": &user.email.clone(), "success": false})),
                },
                Err(error) => {
                    println!("An Error Occurred!\n{}", error);
                    HttpResponse::InternalServerError()
                        .body("An Error Occurred while authenticating user!")
                }
            }
        }
        Ok(None) => {
            HttpResponse::NotFound().json(json!({"message": "User not Found!", "success": false}))
        }
        Err(error) => {
            println!("An Error Occurred!\n{}", error);
            HttpResponse::InternalServerError().body("An Error Occurred while fetching user!")
        }
    }
}

pub async fn init_db(client: &Client) {
    let db: mongodb::Database = client.database(DB_NAME);

    let collections: Vec<String> = db.list_collection_names(None).await.unwrap();
    if !collections.contains(&"users".to_string()) {
        db.create_collection("users", None).await.unwrap();
    }
}
