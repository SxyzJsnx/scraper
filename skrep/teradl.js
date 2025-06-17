import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

export default async function teradl(url) {
  try {
    const jar = new CookieJar();
    const client = wrapper(
      axios.create({
        jar,
        withCredentials: true,
      }),
    );
    const d = new FormData();
    d.append("action", "terabox_api_request");
    d.append("url", url);
    const headers = {
      headers: {
        ...d.getHeaders(),
      },
    };
    const { data } = await client.post(
      "https://terabxdownloader.com/wp-admin/admin-ajax.php",
      d,
      headers,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}
