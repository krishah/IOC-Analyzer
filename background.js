importScripts('ioc_utils.js');

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    analyzers: [
      {
        name: "VirusTotal",
        urlTemplate: "https://www.virustotal.com/gui/search/{ioc}",
        supportedTypes: ["ip", "domain", "url", "hash"],
        enabled: true
      },
      {
        name: "MISP (local)",
        urlTemplate: "https://misp.local/events/index/searchall:{ioc}",
        supportedTypes: ["ip", "hash", "url"],
        enabled: true
      },
      {
        name: "IP Location",
        urlTemplate: "https://www.iplocation.net/ip-lookup?query={ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "Criminal IP",
        urlTemplate: "https://www.criminalip.io/asset/search?query={ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "Alienvault IP",
        urlTemplate: "https://otx.alienvault.com/indicator/ip/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "Alienvault url",
        urlTemplate: "https://otx.alienvault.com/indicator/hostname/{ioc}",
        supportedTypes: ["url"],
        enabled: true
      },
      {
        name: "Talos",
        urlTemplate: "https://talosintelligence.com/reputation_center/lookup?search={ioc}",
        supportedTypes: ["ip,url,hash"],
        enabled: true
      },
      {
        name: "TOR",
        urlTemplate: "https://www.ipqualityscore.com/tor-ip-address-check/lookup/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "MXTools-black",
        urlTemplate: "https://mxtoolbox.com/SuperTool.aspx?action=blacklist%3a{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "WHOIS IP",
        urlTemplate: "https://whoisfreaks.com/tools/dns/lookup/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "Abuse IP",
        urlTemplate: "https://www.abuseipdb.com/check/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },      
      {
        name: "ARIN",
        urlTemplate: "https://search.arin.net/rdap/?query={ioc}",
        supportedTypes: ["ip,url"],
        enabled: true
      },      
      {
        name: "Censys",
        urlTemplate: "https://search.censys.io/hosts/{ioc}",
        supportedTypes: ["ip,url"],
        enabled: true
      },      
      {
        name: "Forti",
        urlTemplate: "https://www.fortiguard.com/search?q={ioc}",
        supportedTypes: ["ip,url,hash"],
        enabled: true
      },      
      {
        name: "Greylog",
        urlTemplate: "https://viz.greynoise.io/ip/{ioc}",
        supportedTypes: ["ip,url"],
        enabled: true
      },      
      {
        name: "IPINFO",
        urlTemplate: "https://ipinfo.io/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "ScamAlytics",
        urlTemplate: "https://scamalytics.com/ip/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },      
      {
        name: "Shodan",
        urlTemplate: "https://www.shodan.io/host/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "Threatminer",
        urlTemplate: "https://www.shodan.io/host/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "IBM X-Force URL",
        urlTemplate: "https://exchange.xforce.ibmcloud.com/url/{ioc}",
        supportedTypes: ["url"],
        enabled: true
      },
      {
        name: "IBM X-Force IP",
        urlTemplate: "https://exchange.xforce.ibmcloud.com/ip/{ioc}",
        supportedTypes: ["ip"],
        enabled: true
      },
      {
        name: "IBM X-Force Hash",
        urlTemplate: "https://exchange.xforce.ibmcloud.com/malware/{ioc}",
        supportedTypes: ["hash"],
        enabled: true
      }
    ]
  });

  chrome.contextMenus.create({
    id: "analyze-ioc",
    title: "Analyze IOC",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyze-ioc") {
    const selectedText = info.selectionText.trim();
    const iocType = detectIOC(selectedText);

    if (!iocType) {
      console.warn("Nie rozpoznano typu IOC:", selectedText);
      return;
    }

    chrome.storage.sync.get(["analyzers"], (data) => {
      const analyzers = data.analyzers || [];

      analyzers.forEach((analyzer) => {
        if (analyzer.enabled && analyzer.supportedTypes.includes(iocType)) {
          const url = analyzer.urlTemplate.replace("{ioc}", encodeURIComponent(selectedText));
          chrome.tabs.create({ url });
        }
      });
    });
  }
});