const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool.query("SELECT * FROM sample ORDER BY id ASC", (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

router.post("/", (req, res) => {
  const values = [
    req.body.id,
    req.body.user_id,
    req.body.vehicle_model_id,
    req.body.package_id,
    req.body.travel_type_id,
    req.body.from_area_id,
    req.body.to_area_id,
    req.body.from_city_id,
    req.body.to_city_id,
    req.body.from_date,
    req.body.to_date,
    req.body.online_booking,
    req.body.mobile_site_booking,
    req.body.booking_created,
    req.body.from_lat,
    req.body.from_long,
    req.body.to_lat,
    req.body.to_long,
    req.body.car_cancellation
  ];
  pool.query(
    "INSERT INTOsample(id,user_id,vehicle_model_id,package_id,travel_type_id,from_area_id,to_area_id,from_city_id,to_city_id,from_date,to_date,online_booking,mobile_site_booking,booking_created,from_lat,from_long,to_lat,to_long,car_cancellation )VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING id,user_id,vehicle_model_id,package_id,travel_type_id,from_area_id,to_area_id,from_city_id,to_city_id,from_date,to_date,online_booking,mobile_site_booking,booking_created,from_lat,from_long,to_lat,to_long,car_cancellation",
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Cannot post" });
      } else {
        console.log(result);
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  pool.query(
    `DELETE FROMsample where id = ${req.params.id} RETURNING id`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ status: "false" });
      } else {
        console.log("Deleted row with id", result.rows[0].id);
        res.status(200).json({ status: "true" });
      }
    }
  );
});
router.put("/:id", (req, res) => {
  console.log(`"${req.body.name}"`);
  pool.query(
    `UPDATE sample SET id = $1,user_id = $2,vehicle_model_id = $3,package_id = $4,travel_type_id = $5,from_area_id = $6,to_area_id = $7,from_city_id = = $8,to_city_id = $9,from_date = $10,to_date = $11,online_booking = $12,mobile_site_booking = $13,booking_created = $14,from_lat = $15,from_long = $16,to_lat = $17,to_long = $18,car_cancellation = $19 WHERE id = ${
      req.params.id
    } returning id`,
    [
      req.body.id,
      req.body.user_id,
      req.body.vehicle_model_id,
      req.body.package_id,
      req.body.travel_type_id,
      req.body.from_area_id,
      req.body.to_area_id,
      req.body.from_city_id,
      req.body.to_city_id,
      req.body.from_date,
      req.body.to_date,
      req.body.online_booking,
      req.body.mobile_site_booking,
      req.body.booking_created,
      req.body.from_lat,
      req.body.from_long,
      req.body.to_lat,
      req.body.to_long,
      req.body.car_cancellation
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ status: "Not Updated" });
      } else {
        console.log("Updated row with id", result.rows[0].id);
        res.status(200).json({ status: "Updated" });
      }
    }
  );
});
