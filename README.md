# n8n-nodes-google-maps-contributor-reviews-api

An [n8n](https://n8n.io/) community node that pulls all reviews written by a Google Maps contributor and returns structured records: reviewer, rating, review text, place, and date. It is backed by the [Google Maps Contributor Reviews API](https://apify.com/johnvc/google-maps-contributor-reviews-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a contributor ID, and it returns one item per review with the contributor name, rating, review text, place title and address, date, and likes. It also works as an **AI Agent tool**, so an agent can audit a reviewer's history on demand.

- Pull a contributor's full review history from Google Maps
- See ratings, places reviewed, dates, and owner responses
- Choose how much data to return per review: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-maps-contributor-reviews-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google Maps Contributor Reviews** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Review > Get** returns reviews written by a contributor.

| Parameter | Description |
| --- | --- |
| Contributor ID | The Google Maps contributor ID. Required. |
| Language Code | Two-letter language code for the results. Defaults to `en`. |
| Maximum Reviews per Contributor | How many reviews to return. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each review is returned as its own n8n item. The API returns more than ten fields per review, so the **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `contributorName`, `reviewId`, `rating`, `snippet`, `date`, `likes`, `placeTitle`, `placeAddress`, and `link`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each review, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `contributor_id` | string | Contributor identifier |
| `position` | integer | Order of the review |
| `contributor_name` | string | Contributor display name |
| `contributor_level` | integer | Local Guide level |
| `contributor_local_guide` | boolean | Whether the contributor is a Local Guide |
| `contributor_points` | integer | Contributor points |
| `contributor_contributions` | object | Counts of reviews, ratings, photos, etc. |
| `contributor_thumbnail` | string | Contributor avatar URL |
| `review_id` | string | Review identifier |
| `rating` | number | Star rating |
| `snippet` | string | Review text |
| `date` | string | Relative review date |
| `likes` | integer | Number of likes |
| `link` | string | Link to the review on Google Maps |
| `place_info` | object | Reviewed place's title and address |
| `images` | array | Photos attached to the review |
| `details` | object | Sub-ratings such as food, service, atmosphere |
| `response` | object | Owner response, when present |

## Example workflows

### 1. Audit a reviewer's history

1. **Manual Trigger**.
2. **Google Maps Contributor Reviews**: Contributor ID a reviewer, Output `Simplified`.
3. **Google Sheets**: append each `placeTitle`, `rating`, and `date`.

### 2. Find a reviewer's negative reviews

1. **Manual Trigger**.
2. **Google Maps Contributor Reviews**: a contributor, Maximum Reviews `100`.
3. **Filter**: keep reviews where `rating` is 2 or below.

### 3. Let an AI Agent analyze a reviewer

1. **AI Agent** node.
2. Attach **Google Maps Contributor Reviews** as a tool.
3. Ask "Summarize what this reviewer tends to praise or criticize." The agent calls the node (in Simplified mode) and answers.

## Pricing

This node calls the [Google Maps Contributor Reviews API](https://apify.com/johnvc/google-maps-contributor-reviews-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/google-maps-contributor-reviews-api?fpr=9n7kx3) for current rates.

## Resources

- [Google Maps Contributor Reviews API on Apify](https://apify.com/johnvc/google-maps-contributor-reviews-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-maps-contributor-reviews-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
