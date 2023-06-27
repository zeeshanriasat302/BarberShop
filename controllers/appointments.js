const STRINGS = require("../utils/texts");
const supabase = require("../config/db");

//services
const LoggerService = require("../config/logger");
const SupaBaseService = require("../services/supabase.service");

class AppointmentsController {
  //create appointment
  async create(req, res) {
    try {
      const { dateTime, customer_id, barber_id } = req.body;

      const { data } = await supabase
        .from("appointments")
        .select()
        .eq("dateTime", req.body.dateTime);

      if (data.length > 0) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.dateTimeAlreadyExist,
          res
        );
      }
      //create
      await SupaBaseService.create("appointments", {
        dateTime,
        customer_id,
        barber_id,
      });

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentCreated,
        res
      );
    } catch (error) {
      console.log("appointments Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //get appointments
  async get(req, res) {
    try {
      // get all appointments
      const { data } = await SupaBaseService.getAll("appointments");

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentsFetched,
        res,
        data
      );
    } catch (error) {
      console.log("appointments Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //get appointments by user id
  async getByUserId(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById(
        "appointments",
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
      console.log("appointments Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //get appointment by id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("appointments", "id", id);

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
      console.log("appointments Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //update appointments by id
  async updateById(req, res) {
    try {
      const id = req.params.id;
      const dateTime = req.body.dateTime;

      const { data } = await SupaBaseService.getById("appointments", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.appointmentNotFound,
          res
        );
      }

      await supabase
        .from("appointments")
        .update({ dateTime: dateTime })
        .eq("id", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentUpdated,
        res
      );
    } catch (error) {
      console.log("appointments Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //delete appointment by id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("appointments", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.appointmentNotFound,
          res
        );
      }
      //delete
      await SupaBaseService.delete("appointments", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.appointmentDeleted,
        res
      );
    } catch (error) {
      console.log("appointments Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
}

module.exports = new AppointmentsController();
