import axios from "axios";


const _apiHost  = "http://127.0.0.1:5000/";
const config = { headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}
};

async function request(url, Data) {

    const new_url = _apiHost + url;
    return await axios.post(new_url, {Data}, config).then(response => {
        if (response.status === 209) {
            const error = response.data;
            return generateResponse(false, response.status, error)
        } else if (response.status === 200) {
          const data = response.data;
          return generateResponse(true, response.status, data)
        }
    }).catch(error => {
        return generateResponse(false, 500, "Server response with 500")
    });
}


function generateResponse(ok, status, data) {
    return {
        ok: ok,
        status: status,
        data: data
    };
}

function get(url, params) {
    return request(url, params);
}

async function create(url, params) {
    return await request(url, params, "POST");
}

function update(url, params) {
    return request(url, params, "PUT");
}

function remove(url, params) {
    return request(url, params, "DELETE");
}

export default {
    get,
    create,
    update,
    remove
};
