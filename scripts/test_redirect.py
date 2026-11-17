import urllib.request

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers):
        return fp

opener = urllib.request.build_opener(NoRedirectHandler)
url = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJut82KRjTPqptBI9UP-W3RfDKO4wgOYWOrW4bQZRwo0vHNVRn9UUsSBi8CKu30TYgvCKS0DfHF_xKTavZUfmw5vaXg_OEndLsDlNspTZRIO-UNBlb4l2tVZBbRaVxCzf7PuHNWR1UFn7jgEyrqmDwYqMk9mf3IW9fikgwK0rUBW_oSI1h9cJ411bmTWevgTE4se3NVAwHMmQeMHYRGzn58WnQvjwaeXgCO5ar4G6eloJ7uY32YFw='

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    resp = opener.open(req)
    print("Code:", resp.code if hasattr(resp, 'code') else resp.status)
    print("Location:", resp.headers.get('Location'))
except Exception as e:
    print("Error:", e)
