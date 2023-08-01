var admin = require("firebase-admin");
const SupaBaseService = require("./supabase.service");
const STRINGS = require("../utils/texts");

class NotificationService {
  //**** new user registered notification sent to admin
  newAppointmentNotification = async (fcm_token, user_id, dateTime) => {
    console.log("user_id-----> ", user_id)
    const {data, error} = await SupaBaseService.getById("user", "id", user_id)
    console.log("userData ----> ", data)
    let title = STRINGS.TEXTS.appointmentCreatedTitle;
    let description =
      STRINGS.TEXTS.appointmentCreatedDescription + `${dateTime}`;
    let status = false;
    // new registered notification to admin
    var appointmentCreated = {
      notification: {
        title: title,
        body: description,
      },
    };
    // const {data, error} = await SupaBaseService.create("notification", {
    //   title,
    //   description,
    //   user_id,
    // });
    // send Notification to device with FCM Token
    // this.SendNotificationFCMToken(fcm_token, appointmentCreated);
  };

  //*************** --- Send Notification to device with FCM Token --- ***************/

//   SendNotificationFCMToken = async (FCMToken, payload) => {
//     if (!FCMToken) {
//       return null;
//     }
//     var options = {
//       priority: "high",
//       timeToLive: 60 * 60 * 24,
//     };
//     admin
//       .messaging()
//       .sendToDevice(FCMToken, payload, options)
//       .then(function (response) {
//         console.log("Successfully sent message:", response.results);
//       })
//       .catch(function (error) {
//         console.log("Error sending message:", error);
//       });
//     return null;
//   };
 }

module.exports = new NotificationService();
