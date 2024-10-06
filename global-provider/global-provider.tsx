import { ReactQueryProvider } from 'app/react-query-provider'
import { ClusterProvider } from 'components/cluster/cluster-data-access'
import { SolanaProvider } from 'components/solana/solana-provider'
import { UserProvider } from 'context/context-provider'

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            <ReactQueryProvider>
                <ClusterProvider>
                    <SolanaProvider>{children}</SolanaProvider>
                </ClusterProvider>
            </ReactQueryProvider>
        </UserProvider>
    )
}

export default GlobalProvider
