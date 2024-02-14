export async function wait(seconds) {
  return new Promise(function scheduleResolve(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}
