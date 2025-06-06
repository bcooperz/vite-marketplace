import ConfigManager from "./configManager";

export default async function bootstrap() {
  const configManager = ConfigManager.getInstance();
  return configManager.init();
}
