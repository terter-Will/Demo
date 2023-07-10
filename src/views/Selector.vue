<template>
    <div>
      <h1>供餐時間選擇器</h1>
      <div class="day-selector">
        <button
          v-for="(day, index) in weekDays"
          :key="index"
          @click="toggleAvailability(index)"
          :class="{ active: selectedDay === index, on: day.available }"
        >
          {{ getWeekDayName(index) }}
        </button>
      </div>
      <div v-if="selectedDay !== null">
        <h3>{{ getWeekDayName(selectedDay) }}</h3>
        <p v-if="weekDays[selectedDay].available" class="availability-text">
          本時段有供餐
        </p>
        <div v-if="weekDays[selectedDay].available">
          <div v-for="(timeSlot, slotIndex) in weekDays[selectedDay].timeSlots" :key="slotIndex">
            <div>
              <select v-model="timeSlot.startTime">
                <option value="" disabled selected>開始時間</option>
                <option v-for="time in availableTimes" :value="time">{{ time }}</option>
              </select>
              <span>-</span>
              <select v-model="timeSlot.endTime">
                <option value="" disabled selected>結束時間</option>
                <option v-for="time in availableTimes" :value="time">{{ time }}</option>
              </select>
              <button @click="removeTimeSlot(selectedDay, slotIndex)">刪除</button>
            </div>
          </div>
          <button @click="addTimeSlot(selectedDay)">新增時段</button>
        </div>
        <p v-else class="availability-text">
          本時段不供餐
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        weekDays: {
          0: { timeSlots: [], available: false },
          1: { timeSlots: [], available: false },
          2: { timeSlots: [], available: false },
          3: { timeSlots: [], available: false },
          4: { timeSlots: [], available: false },
          5: { timeSlots: [], available: false },
          6: { timeSlots: [], available: false },
        },
        selectedDay: null,
        availableTimes: [
          '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
          '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
          '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
          '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
        ],
      };
    },
    methods: {
      getWeekDayName(index) {
        const weekDayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return weekDayNames[index];
      },
      toggleAvailability(index) {
        this.selectedDay = index;
        this.weekDays[index].available = !this.weekDays[index].available;
      },
      addTimeSlot(dayIndex) {
        this.weekDays[dayIndex].timeSlots.push({ startTime: '', endTime: '' });
      },
      removeTimeSlot(dayIndex, slotIndex) {
        this.weekDays[dayIndex].timeSlots.splice(slotIndex, 1);
      },
    },
  };
  </script>
  
  <style>
  .day-selector {
    display: flex;
    justify-content: space-between;
  }
  
  .day-selector button {
    background-color: #eee;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  .day-selector button.active {
    background-color: #ccc;
  }
  
  .day-selector button.on {
    background-color: #00cc00;
    color: #fff;
  }
  
  .availability-text {
    font-weight: bold;
  }
  
  select {
    margin-right: 8px;
  }
  
  button {
    margin-top: 8px;
  }
  </style>
  