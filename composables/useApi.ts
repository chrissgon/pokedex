interface RequestMethods {
  get(url: string, params?: object): Promise<any>;
  post(url: string, body?: object): Promise<any>;
  put(url: string, body?: object): Promise<any>;
  delete(url: string, body?: object): Promise<any>;
}

class Request implements RequestMethods {
  private _options = {
    baseURL: "https://pokeapi.co/api/v2/",
  };

  async get(url: string, params = {}): Promise<any> {
    const { data, error } = await useFetch<Response>(url, {
      params,
      method: "GET",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`GET ${error.value}`);

    return data.value;
  }
  async post(url: string, body: object = {}): Promise<any> {
    const { data, error } = await useFetch<Response>(url, {
      body,
      method: "POST",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`POST ${error.value}`);

    return data.value;
  }
  async put(url: string, body: object = {}): Promise<any> {
    const { data, error } = await useFetch<Response>(url, {
      body,
      method: "PUT",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`PUT ${error.value}`);

    return data.value;
  }
  async delete(url: string, body: object = {}): Promise<any> {
    const { data, error } = await useFetch<Response>(url, {
      body,
      method: "DELETE",
      server: false,
      initialCache: false,
      ...this._options,
    });

    if (error.value) throw new Error(`DELETE ${error.value}`);

    return data.value;
  }
}

export default new Request();
