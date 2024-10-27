import { ReactQueryProvider } from './react-query-provider'
import { ClusterProvider } from './cluster/cluster-data-access'
import { SolanaProvider } from './solana-provider/solana-provider'
import { UserProvider } from './context-provider/context-provider'
import { AuthProvider } from './auth-provider/auth-provider'

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            <AuthProvider>
                <ReactQueryProvider>
                    <ClusterProvider>
                        <SolanaProvider>{children}</SolanaProvider>
                    </ClusterProvider>
                </ReactQueryProvider>
            </AuthProvider>
        </UserProvider>
    )
}

export default GlobalProvider
