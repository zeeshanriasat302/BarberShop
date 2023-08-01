const STRINGS = require("../utils/texts");
const supabase = require("../config/db");

//services
const LoggerService = require("../config/logger");
const SupaBaseService = require("../services/supabase.service");
class Review {
  // create review
  async create(req, res) {
    try {
      const { shop_id, customer_id, rating, comment } = req.body;
      let isExist = await supabase.from("user").select().eq("id", customer_id);
      console.log("isExist", isExist);
      if (!isExist.data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }

      let isShopExist = await supabase.from("shop").select().eq("id", shop_id);
      console.log("isShopExist ", isShopExist);
      if (!isShopExist.data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.shopNotFound,
          res
        );
      }
      //create
      const { data, error } = await SupaBaseService.create("review", {
        shop_id,
        customer_id,
        rating,
        comment,
      });

      console.log("error ---> ", error);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.reviewCreated,
        res
      );
    } catch (error) {
      console.log("review Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }
  //get reviews
  async getAll(req, res) {
    try {
      // get all reviews
      const { data } = await SupaBaseService.getAll("review");

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.reviewFetched,
        res,
        data
      );
    } catch (error) {
      console.log("review Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }
  //get review by id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("review", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.reviewNotFound,
          res
        );
      }

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.reviewFetched,
        res,
        data
      );
    } catch (error) {
      console.log("review Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //update review by id
  async update(req, res) {
    try {
      const id = req.params.id;
      const { rating, comment } = req.body;
      const { data } = await SupaBaseService.getById("review", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.reviewNotFound,
          res
        );
      }

      await supabase.from("review").update({ rating, comment }).eq("id", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.reviewUpdated,
        res
      );
    } catch (error) {
      console.log("review Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }
  //delete review by id
  async delete(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById("review", "id", id);

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.reviewNotFound,
          res
        );
      }
      //delete
      await SupaBaseService.delete("review", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.reviewDeleted,
        res
      );
    } catch (error) {
      console.log("review Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }

  //get review by id
  async getByUserId(req, res) {
    try {
      const id = req.params.id;

      const isUserExist = await supabase.from("user").select().eq("id", id);

      if (!isUserExist.data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }

      const { data } = await SupaBaseService.getAllById(
        "review",
        "customer_id",
        id
      );

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.reviewNotFound,
          res
        );
      }

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.reviewFetched,
        res,
        data
      );
    } catch (error) {
      console.log("review Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        STRINGS.ERRORS.someThingWentWrong,
        res
      );
    }
  }
}

module.exports = new Review();
