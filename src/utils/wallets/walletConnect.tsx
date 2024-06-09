import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider, useAccount, useSignMessage } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const projectId = '772025e4c649cf77b0161d8abeaea295'

const metadata = {
  name: 'Operation Liquidity',
  description: 'Operation Liquidity Waitlist',
  url: window.location.origin,
  icons: ['https://fzw5tczkmp4l7cm46qt3gizwynj3hxrqxlohsxygejkv6ubjyhla.arweave.net/Lm3Ziypj-L-JnPQnsyM2w1Oz3jC63HlfBiJVX1ApwdY']
}

const chains = [mainnet] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true
})


export function WalletConnectWrapper({ children }: any) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}



export function WalletConnectButton() {
  return <w3m-button balance='hide' label='Wallet Connect' />
}




export function SignWCMessage() {
  const { address } = useAccount()
  const { data, signMessage } = useSignMessage()



  const handleSignMessage = async () => {
    try {
      // @ts-ignore
      const signature = signMessage({ message: address })
      const res = await (
        // change later
        await fetch(`http://localhost:3001/record-address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: '1',
            signature: JSON.stringify(signature),
            walletAddress: address,
            network: 'ETH'
          }),
        })
      ).json();
      console.log(res)
    } catch (error) {
      console.error('Error signing WC message:', error)
    }
    
  }

  return <button onClick={handleSignMessage}>Sign Message</button>
}


