import axios from "axios";

export default async function handler(req: any, res: any) {
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
