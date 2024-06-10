import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
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





