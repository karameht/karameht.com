<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="rss/channel/title"/> - RSS Feed</title>
        <style>
          body { font-family: var(--font-body, 'Inter Variable', sans-serif); background: #111; color: #f5f3df; padding: 2rem; }
          .header { border-bottom: 1px solid #f5f3df; padding-bottom: 2rem; margin-bottom: 2rem; }
          .feed-title { color: #f5f3df; font-size: 2rem; margin: 0; }
          .feed-desc { margin: 1rem 0; opacity: 0.8; }
          .item { margin: 2rem 0; padding: 2rem; border-left: 4px solid #f6e024; background: rgba(255,255,255,0.05); }
          .item-title { color: #f6e024; text-decoration: none; font-size: 1.25rem; }
          .item-title:hover { text-decoration: underline; }
          .item-date { opacity: 0.7; font-size: 0.9rem; }
          .item-desc { margin: 1rem 0; line-height: 1.6; }
          .back-link { color: #f6e024; text-decoration: none; margin-bottom: 2rem; display: inline-block; }
          .back-link:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <a href="/" class="back-link">‹ Zurück zur Manufaktur</a>

        <div class="header">
          <h1 class="feed-title"><xsl:value-of select="rss/channel/title"/></h1>
          <p class="feed-desc"><xsl:value-of select="rss/channel/description"/></p>
        </div>

        <xsl:for-each select="rss/channel/item">
          <div class="item">
            <h2><a href="{link}" class="item-title"><xsl:value-of select="title"/></a></h2>
            <div class="item-date"><xsl:value-of select="pubDate"/></div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
