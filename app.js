const express = require("express");
const csv = require("fast-csv");
const pool = require("./pgdb");
const app = express();

pool.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

let counter = 0;

// let header = [];
// let data = [];

let csvStream = csv
  .fromPath(null,".\\csv\\data.csv",{ headers: true })
  .on("data", function(record) {
    csvStream.pause();

    if (counter < 5000) {
      let id = record.id,
        user_id = record.user_id,
        vehicle_model_id = record.vehicle_model_id,
        package_id = record.package_id,
        travel_type_id = record.travel_type_id,
        from_area_id = record.from_area_id,
        to_area_id = record.to_area_id,
        from_city_id = record.from_city_id,
        to_city_id = record.to_city_id,
        from_date = record.from_date,
        to_date = record.to_date,
        online_booking = record.online_booking,
        mobile_site_booking = record.mobile_site_booking,
        booking_created = record.booking_created,
        from_lat = record.from_lat,
        from_long = record.from_long,
        to_lat = record.to_lat,
        to_long = record.to_long,
        Car_Cancellation = record.Car_Cancellation;
      pool.query(
        "INSERT INTO sample(id,user_id,vehicle_model_id,package_id,travel_type_id,from_area_id,to_area_id,from_city_id,to_city_id,from_date,to_date,online_booking,mobile_site_booking,booking_created,from_lat,from_long,to_lat,to_long,car_cancellation) \
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)",
        [
          id,
          user_id,
          vehicle_model_id,
          package_id,
          travel_type_id,
          from_area_id,
          to_area_id,
          from_city_id,
          to_city_id,
          from_date,
          to_date,
          online_booking,
          mobile_site_booking,
          booking_created,
          from_lat,
          from_long,
          to_lat,
          to_long,
          Car_Cancellation
        ],
        function(err) {
          if (err) {
            console.log(err);
          }
        }
      );
      ++counter;
    }

    csvStream.resume();
  })
  .on("end", function() {
    console.log("Job is done!");
  })
  .on("error", function(err) {
    console.log(err);
  });
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
