interface RequestMethods {
  get(url: string, params?: object): Promise<any>;
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
}

export default new Request();
