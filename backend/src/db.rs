use actix_web::{post, web, HttpResponse};
use bcrypt::hash;
use mongodb::{bson::doc, Client, Collection};

use crate::models::User;

const DB_NAME: &str = "ecommdb";

// @todo! Add a flag to differentiate between newly created user response and already existing user response;
#[post("/add-user")]
pub async fn add_user(client: web::Data<Client>, form: web::Form<User>) -> HttpResponse {
    let collection: Collection<User> = client.database(DB_NAME).collection("users");
    let user: User;

    match collection.find_one(doc! {"email": &form.email}, None).await {
        Ok(Some(ex_user)) => {
            user = ex_user;
        }
        Ok(None) => {
            let hashed_pass: String = hash(&form.password, 12).unwrap();
            user = User {
                email: String::from(&form.email),
                password: hashed_pass,
            };

            collection.insert_one(user.clone(), None).await.unwrap();
        }
        Err(error) => {
            println!("An Error Occurred!\n{}", error);
            return HttpResponse::InternalServerError()
                .body("An Error Occurred while creating user!");
        }
    }

    HttpResponse::Ok().json(user)
}

pub async fn init_db(client: &Client) {
    let db: mongodb::Database = client.database(DB_NAME);

    let collections: Vec<String> = db.list_collection_names(None).await.unwrap();
    if !collections.contains(&"users".to_string()) {
        db.create_collection("users", None).await.unwrap();
    }
}
