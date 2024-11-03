import { useState, FormEvent } from 'react';
import numeral from 'numeral';
import supported_curerncies from './supported_currencies';

const App = () => {
  const [convertingData, setConvertingData] = useState<{
    amount: undefined | number;
    from: string;
    to: string;
  }>({
    amount: undefined,
    from: 'USD',
    to: 'EUR',
  });
  const [convertedDetails, setConvertedDetails] = useState({
    amountToConvert: 0,
    convertedAmount: 0,
    from: '',
    to: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${
      convertingData.from
    }&to=${convertingData.to}&amount=${
      convertingData.amount && +convertingData?.amount
    }`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '281562bcc1msh27808b4067b6206p121212jsnafbb30784eb8',
        'x-rapidapi-host': 'currency-converter18.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const { result } = await response.json();
      console.log(result);
      setConvertedDetails({
        amountToConvert: +result.amountToConvert,
        convertedAmount: +result.convertedAmount,
        from: result.from,
        to: result.to,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-2xl flex justify-center items-center flex-col rounded px-4'>
        <h1 className='text-2xl mt-4 mb-4 font-bold'>
          <span className='text-red-500'>A</span>
          <span className='text-orange-500'>l</span>
          <span className='text-yellow-300'>l</span>
          <span className='text-green-500'>i</span>
          <span className='text-blue-500'>s</span>
          <span className='text-violet-500'>o</span>
          <span className='text-red-500'>n</span>{' '}
          <span className='text-orange-500'>B</span>
          <span className='text-yellow-300'>u</span>
          <span className='text-green-500'>r</span>
          <span className='text-blue-500'>g</span>
          <span className='text-violet-500'>e</span>
          <span className='text-red-500'>r</span>
          <span className='text-orange-500'>s</span> Currency Converter
        </h1>

        <form onSubmit={handleSubmit} className='mb-2'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Amount</label>
            <input
              type='text'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter amount'
              value={
                convertingData.amount === 0 ? undefined : convertingData.amount
              }
              onChange={(e) => {
                const clone = { ...convertingData };
                clone.amount = e.target.value as unknown as number;
                setConvertingData(clone);
              }}
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>From</label>
            <select
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={convertingData.from}
              onChange={(e) => {
                const clone = { ...convertingData };
                clone.from = e.target.value;
                setConvertingData(clone);
              }}
            >
              {supported_curerncies.map((currency) => (
                <option value={currency.symbol}>
                  {currency.name} - {currency.symbol}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>To</label>
            <select
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={convertingData.to}
              onChange={(e) => {
                const clone = { ...convertingData };
                clone.to = e.target.value;
                setConvertingData(clone);
              }}
            >
              {supported_curerncies.map((currency) => (
                <option value={currency.symbol}>
                  {currency.name} - {currency.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className='flex justify-center items-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 ml-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Convert
            </button>
          </div>
        </form>
        {convertedDetails.amountToConvert > 0 &&
          convertedDetails.convertedAmount > 0 && (
            <div className='mb-2'>
              <div className='text-center'>
                <p className='text-gray-700'>
                  {convertedDetails.convertedAmount /
                    convertedDetails.amountToConvert <
                  1 ? (
                    <>
                      <span>1 {convertedDetails.to}</span> is equal to{' '}
                      <span>
                        {numeral(
                          convertedDetails.amountToConvert /
                            convertedDetails.convertedAmount
                        ).format('0,0.00')}
                        {convertedDetails.from}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>1 {convertedDetails.from}</span> is equal to{' '}
                      <span>
                        {numeral(
                          convertedDetails.convertedAmount /
                            convertedDetails.amountToConvert
                        ).format('0,0.00')}{' '}
                        {convertedDetails.to}
                      </span>
                    </>
                  )}
                  {/* {convertedDetails.convertedAmount /
                    convertedDetails.amountToConvert <
                  1
                    ? <span className='font-bold'>1 {convertedDetails.from}</span>
                  is equal to
                  <span className='font-bold'>
                    {numeral(
                      convertedDetails.convertedAmount /
                        convertedDetails.amountToConvert
                    ).format('0,0.00')}
                    {convertedDetails.to}
                  </span>
                    : ''} */}
                </p>
              </div>
              <div className='flex'>
                <p className='text-gray-700'>
                  <span>
                    {numeral(convertedDetails.convertedAmount).format(
                      '0,0.0000'
                    )}{' '}
                    {convertedDetails.to}
                  </span>{' '}
                  is equal to:{' '}
                  <span className='font-bold'>
                    {numeral(convertedDetails.amountToConvert).format('0,0.00')}
                    {convertedDetails.from}
                  </span>{' '}
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default App;
