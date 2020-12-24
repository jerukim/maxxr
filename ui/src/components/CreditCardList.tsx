const CreditCardList = ({ children }: any) => {
    return (
        <div className='dashboard-cards'>
            <h1>My Wallet</h1>
            {children}
        </div>
    )
}

export default CreditCardList