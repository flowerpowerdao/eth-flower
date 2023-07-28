import fs from "fs";
import path from "path";
import { AssetV2, StableChunk__1 } from "../declarations/main/staging.did";
import { getOrder } from "./ethflowerNFTOrder";

let metadataPath = path.resolve(
  __dirname,
  "data",
  "btcflower_no_mint_number.json"
);
if (!fs.existsSync(metadataPath)) {
  throw new Error(`File ${metadataPath} not found`);
}

export async function assets() {
  let assetsChunk = await getAssets();
  const assets: StableChunk__1 = [
    {
      v2: {
        assetsChunk: assetsChunk,
        assetsCount: BigInt(assetsChunk.length),
        placeholder: {
          thumbnail: [],
          payloadUrl: [],
          thumbnailUrl: [],
          metadata: [],
          name: "placeholder",
          payload: { data: [], ctype: "" },
        },
      },
    },
  ];
  return assets;
}

async function getAssets() {
  let metadata = JSON.parse(fs.readFileSync(metadataPath).toString());
  let order = await getOrder();

  let assetsChunk : AssetV2[] = order.map((nftIndex) => {
    return {
      thumbnail: [],
      payloadUrl: [
        `https://n6au6-3aaaa-aaaae-qaaxq-cai.raw.ic0.app/${nftIndex}.svg`,
      ],
      thumbnailUrl: [
        `https://n6au6-3aaaa-aaaae-qaaxq-cai.raw.ic0.app/${nftIndex}_low.svg`,
      ],
      metadata: [
        {
          data: [
            new TextEncoder().encode(JSON.stringify(metadata[nftIndex - 1])),
          ],
          ctype: "application/json",
        },
      ],
      name: String(nftIndex),
      payload: {
        data: [],
        ctype: "",
      },
    };
  });

  return assetsChunk;
}
