function detectIOC(text) {
  const patterns = {
    ip: /^(?:\d{1,3}\.){3}\d{1,3}$/,
    url: /^(https?:\/\/)?([\w.-]+)\.\w{2,}(\/\S*)?$/,
    hash: /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/,
    domain: /^([\w-]+\.)+[\w-]{2,}$/
  };

  for (let [type, regex] of Object.entries(patterns)) {
    if (regex.test(text)) {
      return type;
    }
  }

  return null;
}