
function kalmanGain(stateEstimateError, measureError){
  return stateEstimateError/ (stateEstimateError + measureError);
}

function kalmanEstimate(previousEstimate, measuredValue, kalmanGain){
  return previousEstimate + kalmanGain * (measuredValue - previousEstimate);
}

function stateEstimateError(kalmanGain, previousStateEstimateError){
  return (1 - kalmanGain) * previousStateEstimateError;
}

module.exports = {
  kalmanGain:kalmanGain,
  kalmanEstimate:kalmanEstimate,
  stateEstimateError:stateEstimateError
}
