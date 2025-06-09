interface Config {
  sessionDuration: number;
}

class ConfigManager {
  private static instance: ConfigManager | null = null;
  private config: Config | null = null;

  public static getInstance() {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public async init() {
    if (this.config) return;

    // todo: check if config value would be set immedietly after promise is resolved when called from another function
    // return requestFn<Config>({
    //   method: "GET",
    //   path: "config",
    // }).then((res) => {
    //   this.config = res.data;
    // });

    return fetch("https://localhost:3000/api/config", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json() as Promise<Config>)
      .then((data) => {
        this.config = data;
      });
  }

  public getConfig() {
    if (!this.config) throw new Error("Config not initialized");
    return this.config;
  }
}

export default ConfigManager;
