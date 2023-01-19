import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { Layout } from 'Layout/Layout';
import { css } from '@emotion/react';

const WrapCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
`

const submitAreaCss = css`
  text-align: center;
  padding: 32px 0 0 0;
`

const InputsCss = css`
  flex: 1;
`

const Record = ({}) => {
  return (
      <Layout>
        <>ご指定いただいたページは存在しませんでした</>
     </Layout>
  );
};

export default Record;
