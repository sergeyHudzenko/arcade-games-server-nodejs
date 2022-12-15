const { accountData } = require("./accountData");

const LedgerTransactionType = {
    PurchaseToken: 0,
    SpendTokens: 1
}

const ledgerFactory = () => {
    
    const tableSize = 10;
    let accountBalance = accountData.accountBalance;
    let id = 0;

    const generateAmount = () => {
        const max = 100;
        const min = 1;
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const fieldsFactory = () => {
        const amount = generateAmount();
        let transactionType, title;

        if (Math.random() > 0.5) {
            title = `Purchased ${amount} tokens`;
            transactionType = LedgerTransactionType.PurchaseToken;
            accountBalance += amount;
        } else {
            title = `Spend ${amount} tokens to Casino Royal`;
            transactionType = LedgerTransactionType.SpendTokens;
            accountBalance -= amount;
        }

        if (accountBalance < 0) {
            return fieldsFactory();
        }

        id++;

        return {
            id,
            title,
            amount,
            accountBalance,
            transactionType,
            date: new Date(),
        };
    };

    const data = [];

    for (let i = 0; i < tableSize; i++) {
        data.push(fieldsFactory());
    }

    accountData.accountBalance = data[data.length - 1].accountBalance;

    return data
}

exports.ledgerData = ledgerFactory()
