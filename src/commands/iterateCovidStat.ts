import { InputPeerChannel } from "@entities/InputPeerChannel";
import { telegram } from '@services/telegram';
import { getStdIn } from '@utils/getStdIn';
import { nextInput } from '.';
import { Message } from '@entities/Messages/Message';

const covidChatInputPeerChannel: InputPeerChannel = {
  _: "inputPeerChannel",
  access_hash: "4725017194861966055",
  channel_id: 1443124285,
};
const pageSize = 10;

export async function iterateCovidStat() {
  let add_offset = 0;
  while (true) {
    const messages = await telegram.getHistory({
      hash: Math.random().toString(),
      limit: pageSize,
      peer: covidChatInputPeerChannel,
      add_offset,
    });

    const statMessages = messages.messages.filter(isStatisticsMessage);
    const stat = statMessages.map(getStat);
    console.log(stat);
    const input = await getStdIn(`${nextInput} - continue the search\n<any key> - return to the main menu`);
    if (input !== nextInput) {
      break;
    }
    add_offset += pageSize;
  }
}

const subStrIsStatistics = 'В России выявлено ';
function isStatisticsMessage(message: Message): boolean {
  return message.message.includes(subStrIsStatistics);
}

function getStat(message: Message) {
  let lines = message.message.split('\n');
  lines = lines.filter(l =>
    l.includes('Калининградская')
    || l.includes('Новосибирская')
    || l.includes('Москва')
  );

  return {
    date: new Date(message.date * 1000),
    lines,
  };
}
