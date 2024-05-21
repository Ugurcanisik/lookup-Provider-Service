class CountryDetail {
    private id: string;
    private code: string;
    private name: string;
    private flag: string;
    private currency_symbol: string;

    setID(id: string) {
        this.id = id;
    }

    setCode(code: string) {
        this.code = code;
    }

    setName(name: string) {
        this.name = name;
    }

    setFlag(flag: string) {
        this.flag = flag;
    }

    setCurrencySymbol(currency_symbol: string) {
        this.currency_symbol = currency_symbol;
    }
}

export default CountryDetail;
