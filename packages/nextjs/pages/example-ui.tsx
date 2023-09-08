import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const GET_GREETINGS = gql`
  query MyQuery {
    greetings(orderBy: createdAt, orderDirection: desc) {
      createdAt
      greeting
      id
      premium
      transactionHash
      value
      sender {
        address
        greetingCount
        id
      }
      blockNumber
    }
  }
`;

const GET_GREETERS = gql`
  query MyQuery {
    senders {
      address
      greetingCount
    }
  }
`;

const ExampleUI: NextPage = () => {
  const { loading, error, data } = useQuery(GET_GREETINGS);
  const { data: greetersData } = useQuery(GET_GREETERS);

  console.log({ loading, error, data });

  return (
    <>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractInteraction />
        <ContractData />
      </div>
      <h1>Greetings</h1>
      <div>
        <ul>
          {data?.greetings.map((greeting: any) => (
            <li>
              {greeting.greeting} - {greeting.sender.address} - {greeting.blockNumber}
            </li>
          ))}
        </ul>
      </div>
      <h1>Greeters</h1>
      <div>
        <ul>
          {greetersData?.senders.map((sender: any) => (
            <li>
              {sender.address} - {sender.greetingCount}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ExampleUI;
