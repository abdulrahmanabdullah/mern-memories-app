import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();
export const getGoogleUserToken = async (code) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_AUTH_ID,
    client_secret: process.env.GOOGLE_AUTH_SECRET,
    redirect_uri: process.env.GOOGLE_AUTH_REDIRECT,
    grant_type: "authorization_code",
  };
  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGoogleUser = async (id_token, access_token) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
