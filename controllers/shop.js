const STRINGS = require("../utils/texts");
const supabase = require("../config/db");

//services
const LoggerService = require("../config/logger");
const SupaBaseService = require("../services/supabase.service");

class Shop {
  // create shop
  async create(req, res) {
    try {
      const {
        address,
        description,
        opening_hour,
        closing_hour,
        status,
        barber_id,
      } = req.body;

      let isExist = await supabase.from("user").select().eq("id", barber_id);
      if (isExist.data.length == 0) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }
      //create
      await SupaBaseService.create("shop", {
        status,
        address,
        description,
        opening_hour,
        closing_hour,
        barber_id,
      });

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.shopCreated,
        res
      );
    } catch (error) {
      console.log("shop Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //get shop by id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("shop", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.shopNotFound,
          res
        );
      }

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.shopFetched,
        res,
        data
      );
    } catch (error) {
      console.log("shop Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //get shops
  async getAll(req, res) {
    try {
      // get all shop
      const { data } = await SupaBaseService.getAll("shop");

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.shopFetched,
        res,
        data
      );
    } catch (error) {
      console.log("shop Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //update shop by id
  async update(req, res) {
    try {
      const id = req.params.id;
      const {
        address,
        description,
        opening_hour,
        closing_hour,
        status,
        barber_id,
      } = req.body;
      const { data } = await SupaBaseService.getById("shop", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.shopNotFound,
          res
        );
      }

      await supabase
        .from("shop")
        .update({ address, description, opening_hour, closing_hour, status })
        .eq("id", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.shopUpdated,
        res
      );
    } catch (error) {
      console.log("shop Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //update shop status
  async updateStatus(req, res) {
    try {
      const id = req.params.id;
      const { status } = req.body;
      console.log(status)
      const { data } = await SupaBaseService.getById("shop", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.shopNotFound,
          res
        );
      }

      await supabase
        .from("shop")
        .update({ status })
        .eq("id", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.shopUpdated,
        res
      );
    } catch (error) {
      console.log("shop Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //delete shop by id
  async delete(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("shop", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.shopNotFound,
          res
        );
      }
      //delete
      await SupaBaseService.delete("shop", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.shopDeleted,
        res
      );
    } catch (error) {
      console.log("shop Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
}

module.exports = new Shop();
