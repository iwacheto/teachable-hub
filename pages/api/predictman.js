import axios from 'axios';

export default async function handler(req, res) {

  try {

    const response = await axios.post(`${process.env.PREDICTMAN_API_URL}/${req.body.url.owner}/${req.body.url.name}/predict/`, req.body.data, {
      headers: {
        "X-Serving-Key": getApiKey(req.body.url.name),
      },
    })

    res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      error: error?.response?.data?.detail,
    });
  }

}

const getApiKey = (predictable) => {
  switch (predictable) {
    case 'second':
      return process.env.PREDICTMAN_API_KEY;
    case 'webrika':
      return process.env.PREDICTMAN_API_KEY_W;
    case 'third':
      return process.env.PREDICTMAN_API_KEY_THIRD;
    case 'fourth':
      return process.env.PREDICTMAN_API_KEY_FOURTH;
    case 'fifth':
      return process.env.PREDICTMAN_API_KEY_FIFTH;
  }
}