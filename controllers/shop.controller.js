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
        shop_name,
      } = req.body;

      let isExist = await supabase.from("user").select().eq("id", barber_id);
      if (!isExist.data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }

      let isShopExist = await supabase.from("shop").select().eq("shop_name", shop_name)
      if (isShopExist.data.length > 0) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.shopAlreadyExist,
          res
        );
      }
      //create
      const {data, error} = await SupaBaseService.create("shop", {
        status,
        address,
        description,
        opening_hour,
        closing_hour,
        barber_id,
        shop_name,
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
        STRINGS.ERRORS.someThingWentWrong,
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
        STRINGS.ERRORS.someThingWentWrong,
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
        STRINGS.ERRORS.someThingWentWrong,
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
        STRINGS.ERRORS.someThingWentWrong,
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
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //delete shop by id
  async delete(req, res) {
    try {
      const id = req.params.id;
      const isShopExist = await SupaBaseService.getById("shop", "id", id);
      if (!isShopExist) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.shopNotFound,
          res
        );
      }

      const reviews = await SupaBaseService.getAllById("review", "shop_id", id)
      const appointments = await SupaBaseService.getAllById("appointment", "shop_id", id)

      console.log("reviews ---> ", reviews)
      //delete
      const {data, error } =await SupaBaseService.delete("shop", id);

      console.log(error)
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.shopDeleted,
        res
      );
    } catch (error) {
      console.log("shop Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }
}

module.exports = new Shop();
