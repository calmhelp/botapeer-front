import Head from "next/head";
import { css } from "@emotion/react";
import Image from "next/image";
import { Layout } from "Layout/Layout";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PersistLogin from "components/PersistLogin";

const H3TitleCss = css`
  padding: 5px 0 0 0;
  font-size: 16px;
  font-weight: bold;
`;

const ListCss = css`
  display: flex;
  li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 140px;
    margin: 0 0 30px 20px;
  }
  li:first-of-type {
    margin: 0;
  }
`;

export default function Home() {
  return (
    <PersistLogin>
      <>
      <Head>
        <title>ボータピア</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          <div>
            <h2>みんなの生育記録 📝</h2>
          </div>
          <ul css={ListCss}>
          <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
          </ul>
          <div>
            <h2>みんなの投稿 ✍️</h2>
          </div>
          <ul css={ListCss}>
          <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={140}
                height={140}
                alt="植物"
                css={{ objectFit: "cover" }}
                priority
              /><br />
              <span>2022/12/15-</span>
            </li>
          </ul>
        </>
      </Layout>
      </>
    </PersistLogin>
  );
}
