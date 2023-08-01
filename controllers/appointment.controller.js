const STRINGS = require("../utils/texts");
const supabase = require("../config/db");

//services
const LoggerService = require("../config/logger");
const SupaBaseService = require("../services/supabase.service");
const NotificationService = require("../services/notification.service")

class AppointmentsController {
  //create appointment
  async create(req, res) {
    try {
      const { dateTime, customer_id, barber_id , shop_id} = req.body;

      const isAppointment = await supabase
        .from("appointment")
        .select()
        .eq("dateTime", dateTime);

      if (isAppointment.data.length > 0) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.dateTimeAlreadyExist,
          res
        );
      }
      // create
      const { data, error } = await SupaBaseService.create("appointment", {
        dateTime,
        customer_id,
        barber_id,
        shop_id
      });

      const fcmToken = "234"
      NotificationService.newAppointmentNotification(fcmToken, barber_id, dateTime)

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentCreated,
        res
      );
    } catch (error) {
      console.log("appointment Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //get appointments
  async get(req, res) {
    try {
      // get all appointments
      const { data } = await SupaBaseService.getAll("appointment");

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentsFetched,
        res,
        data
      );
    } catch (error) {
      console.log("appointment Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //get appointments by user id
  async getByUserId(req, res) {
    try {
      const id = req.params.id;
      const { data, error } = await SupaBaseService.getAllById(
        "appointment",
        "customer_id",
        id
      );

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.appointmentNotFound,
          res
        );
      }

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentsFetched,
        res,
        data
      );
    } catch (error) {
      console.log("appointment Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //get appointment by id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("appointment", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.appointmentNotFound,
          res
        );
      }

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentsFetched,
        res,
        data
      );
    } catch (error) {
      console.log("appointment Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //update appointments by id
  async updateById(req, res) {
    try {
      const id = req.params.id;
      const dateTime = req.body.dateTime;

      const { data } = await SupaBaseService.getById("appointment", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.appointmentNotFound,
          res
        );
      }

      await supabase
        .from("appointment")
        .update({ dateTime: dateTime })
        .eq("id", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentUpdated,
        res
      );
    } catch (error) {
      console.log("appointment Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //delete appointment by id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("appointment", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.appointmentNotFound,
          res
        );
      }
      //delete
      await SupaBaseService.delete("appointment", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentDeleted,
        res
      );
    } catch (error) {
      console.log("appointment Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }
}

module.exports = new AppointmentsController();
