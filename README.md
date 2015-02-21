# Universal Cross Site Scripting PoC

This is a PoC for CVE-2015-0072 for sequentialy get the targeted websites cookies.

## Usage

    npm install
    node app.js

For basic logging launch

    node app.js > cookies.txt

## Configuration

In `conf.json`, set `host` to the value of your public host and `targets` to
the sites to retrieve the cookies.

Note that targets must not set the HTTP header `x-frame-options`.

## References

* (http://www.deusen.co.uk/items/insider3show.3362009741042107/)[Original PoC]
* (http://packetstormsecurity.com/files/130308/Microsoft-Internet-Explorer-Universal-XSS-Proof-Of-Concept.html)[Evolved PoC]
* (http://sijmen.ruwhof.net/weblog/427-mitigations-against-critical-universal-cross-site-scripting-vulnerability-in-fully-patched-internet-explorer-10-and-11)[Defence analysis]
