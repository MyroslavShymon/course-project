<template>
  <div class="note-wrapper" @click="show($event)">
    <v-col
      cols="12"
      md="12"
      class="pa-1 d-flex align-center justify-center flex-column"
    >
      <v-card class="pa-4" style="width: 50%">
        <form @submit.prevent="addNote">
          <v-text-field
            :label="$t('Task title')"
            :placeholder="$t('Enter the title')"
            outlined
            color="primary"
            v-model.trim="taskTitle"
            v-if="fieldShow"
          ></v-text-field>
          <v-row justify="center" v-if="fieldShow">
            <v-date-picker v-model="datePicker"></v-date-picker>
            <v-time-picker
              v-model="timePicker"
              :allowed-minutes="allowedStep"
              class="mt-4"
              format="24hr"
              landscape
            ></v-time-picker>
          </v-row>
          <div class="d-flex">
            <v-textarea
              rows="1"
              name="input-7-4"
              :label="$t('Task description')"
              required
              :rules="rulesTaskDescriptionInput"
              v-model.trim="taskDescription"
              @click="fieldShow = true"
            ></v-textarea>
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="pa-2"
                  style="width: 25px; height: 25px"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-dots-vertical</v-icon
                >
              </template>
              <v-list>
                <v-list-item @click="sortByGroupName" class="pointer">
                  <v-list-item-title>{{
                    $t("Sort by group name")
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="groupWrapper = true" class="pointer">
                  <v-list-item-title>{{ $t("Add group") }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="sortByDate" class="pointer">
                  <v-list-item-title>{{
                    $t("Sort by date")
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="mt-2" v-if="fieldShow">
            <v-select
              :items="groupNames"
              :label="$t('Group names')"
              outlined
              v-model="groupNameSelected"
            ></v-select>
          </div>
          <v-row cols="12" v-if="fieldShow">
            <v-col md="12" v-if="groupWrapper"
              ><v-row>
                <v-col md="7" class="d-flex justify-center align-center">
                  <v-text-field
                    :label="$t('Group name')"
                    :placeholder="$t('Enter the name')"
                    color="primary"
                    v-model.trim="groupName"
                    @keyup.enter="addGroupName"
                  ></v-text-field>
                </v-col>
                <v-col md="5" class="d-flex justify-end align-center">
                  <v-btn color="secondary color_black" @click="addGroupName">
                    {{ $t("Add group name") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn
            v-if="fieldShow"
            color="secondary color_black"
            block
            type="submit"
            :disabled="
              this.$v.$invalid || this.datePicker == '' || this.timePicker == ''
            "
            class="mt-2"
          >
            {{ $t("Set") }}
          </v-btn>
        </form>
      </v-card>
      <draggable
        style="width: 50%"
        :list="notes"
        :disabled="!enabled"
        class="list-group mt-3"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div
          class="list-group-item"
          v-for="(note, noteIndex) of notes"
          :key="noteIndex"
        >
          <v-card v-if="note._group == ''" class="mt-1">
            <div class="d-flex justify-space-between">
              <v-card-title class="py-1">{{ note._title }}</v-card-title>
              {{ note._date }} {{ note._time }}
              <v-card-actions class="d-flex align-center mx-4">
                <v-icon
                  class="pointer"
                  @click="pinNote(note, noteIndex)"
                  v-if="note._pin == false"
                  >mdi-pin-outline</v-icon
                >
                <v-icon
                  class="pointer"
                  @click="pinNote(note, noteIndex)"
                  v-if="note._pin == true"
                  >mdi-pin</v-icon
                >
              </v-card-actions>
            </div>
            <div class="d-flex align-center">
              <v-card-text
                :class="
                  note._done == true ? 'text-decoration-line-through' : ''
                "
                >{{ note._description }}
              </v-card-text>
              <v-checkbox
                :value="`${noteIndex}`"
                v-model="done"
                @click="
                  note._done == true
                    ? (note._done = false)
                    : (note._done = true)
                "
              ></v-checkbox>
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mx-6 pa-2"
                    style="width: 25px; height: 25px"
                    v-bind="attrs"
                    v-on="on"
                    >mdi-dots-vertical</v-icon
                  >
                </template>
                <v-list>
                  <v-list-item @click="deleteNote(note)" class="pointer">
                    <v-list-item-title>{{
                      $t("Delete note")
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card>
          <v-card v-else-if="note._group != ''" class="mt-1">
            <div class="d-flex justify-space-between">
              <v-card-title class="py-1"
                >{{ note._title }} {{ $t("Group name")
                }}{{ `: ${note._group}` }}</v-card-title
              >
              {{ note._date }} {{ note._time }}
              <v-card-actions class="d-flex align-center mx-4">
                <v-icon
                  class="pointer"
                  @click="pinNote(note, noteIndex)"
                  v-if="note._pin == false"
                  >mdi-pin-outline</v-icon
                >
                <v-icon
                  class="pointer"
                  @click="pinNote(note, noteIndex)"
                  v-if="note._pin == true"
                  >mdi-pin</v-icon
                >
              </v-card-actions>
            </div>
            <div class="d-flex align-center">
              <v-col md="12">
                <v-row>
                  <v-col md="10">
                    <v-card-text
                      :class="
                        note._done == true ? 'text-decoration-line-through' : ''
                      "
                      >{{ note._description }}
                    </v-card-text>
                  </v-col>
                  <v-col md="2" class="d-flex justify-center align-center">
                    <v-checkbox
                      class="pa-0"
                      :value="`${noteIndex}`"
                      v-model="done"
                      @click="
                        note._done == true
                          ? (note._done = false)
                          : (note._done = true)
                      "
                    ></v-checkbox>
                    <v-menu bottom offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="mx-6"
                          style="width: 25px; height: 25px; padding-bottom: 7px"
                          v-bind="attrs"
                          v-on="on"
                          >mdi-dots-vertical</v-icon
                        >
                      </template>
                      <v-list>
                        <v-list-item @click="deleteNote(note)" class="pointer">
                          <v-list-item-title>{{
                            $t("Delete note")
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
            </div>
          </v-card>
          <v-card
            v-else-if="note._description"
            class="mt-1 px-4 pt-2 pb-3 d-flex flex-column"
          >
            {{ note._date }} {{ note._time }}
            <v-card-actions class="d-flex align-center justify-end pt-0">
              <v-icon
                class="pointer"
                @click="pinNote(note, noteIndex)"
                v-if="note._pin == false"
                >mdi-pin-outline</v-icon
              >
              <v-icon
                class="pointer"
                @click="pinNote(note, noteIndex)"
                v-if="note._pin == true"
                >mdi-pin</v-icon
              >
            </v-card-actions>

            <div class="d-flex align-center">
              <v-col md="12">
                <v-row>
                  <v-col md="10">
                    <v-card-text
                      :class="
                        note._done == true ? 'text-decoration-line-through' : ''
                      "
                      >{{ note._description }}
                    </v-card-text>
                  </v-col>
                  <v-col md="2" class="d-flex justify-center align-center">
                    <v-checkbox
                      :value="`${noteIndex}`"
                      v-model="done"
                      @click="
                        note._done == true
                          ? (note._done = false)
                          : (note._done = true)
                      "
                    ></v-checkbox>
                    <v-menu bottom offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          style="width: 25px; height: 25px"
                          class="mx-2 pa-2"
                          v-bind="attrs"
                          v-on="on"
                          >mdi-dots-vertical</v-icon
                        >
                      </template>
                      <v-list>
                        <v-list-item @click="deleteNote(note)" class="pointer">
                          <v-list-item-title>{{
                            $t("Delete note")
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
            </div>
          </v-card>
        </div>
      </draggable>
      <span class="d-none">{{ notesGet }}</span>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ValidationEvaluation, ValidationProperties } from "vue/types/vue";
import { Validation, validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
import Note from "@/store/modules/Note";
import INote from "@/store/interfaces/INote";
import draggable from "vuedraggable";
import Task from "@/store/modules/Task";
import Reminder from "@/store/modules/Reminder";

@Component({
  name: "Login",
  mixins: [validationMixin],
  validations: {
    taskDescription: { required },
  },
  components: {
    draggable,
  },
  data() {
    return {
      dragging: false,
      enabled: true,
      fieldShow: false,
      taskTitle: "",
      taskDescription: "",
      groupWrapper: false,
    };
  },
  methods: {
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 10 && v <= 50,
    allowedStep: (m) => m % 10 === 0,
  },
})
export default class Login extends Vue {
  private store: MyStore = useStore(this.$store);
  private taskTitle: string = "";
  private taskDescription: string = "";
  private groupName: string = "";
  private groupNameSelected: string = "";
  private groupNames: string[] = [];
  private pin: boolean = false;
  private done: boolean = false;
  private notes: INote[] = [];
  private datePicker: string = "";
  private timePicker: string = "";

  private get rulesTaskDescriptionInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.taskDescription.$dirty && this.$v.taskDescription.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }

  private deleteNote(note: INote) {
    const filteredNoteArray: INote[] = this.store.reminder
      .getNotes("reminder")
      .filter(
        (findNote: INote) => JSON.stringify(findNote) !== JSON.stringify(note)
      );
    this.notes = filteredNoteArray;
    this.store.reminder.setNotesLocal("reminder", filteredNoteArray);
  }
  private addGroupName() {
    this.$data.groupWrapper = false;
    this.groupNames.push(this.groupName);
    this.groupName = "";
    localStorage.notesReminderNames = JSON.stringify(this.groupNames);
  }
  private sortByGroupName() {
    this.notes = this.store.reminder.sortByGroupName("reminder");
  }
  private checkMove(e: any) {
    window.console.log("Future index: ", e.draggedContext);
    console.log(this.notes);
  }

  public get notesGet(): INote[] {
    this.saveChanges(this.notes);
    return this.notes;
  }

  private saveChanges(notes: INote[]) {
    localStorage.reminder = JSON.stringify(notes);
  }

  private show(e: any) {
    if (
      e.target.classList.value.includes(
        "pa-1 d-flex align-center justify-center flex-column"
      ) == true
    )
      this.$data.fieldShow = false;
  }

  private pinNote(note: any, noteIndex: number) {
    const pinNotesToLocalStorage = JSON.parse(localStorage.reminder).map(
      (item: any, itemIndex: number) => {
        if (noteIndex === itemIndex)
          item._pin == false ? (item._pin = true) : (item._pin = false);
        return item;
      }
    );

    localStorage.reminder = JSON.stringify(pinNotesToLocalStorage);
    this.notes = this.store.reminder.getLocal("reminder");
  }

  private sortByDate() {
    console.log(this.store.reminder.getSortedByDate());

    this.notes = this.store.reminder.getSortedByDate();
    localStorage.reminder = JSON.stringify(this.notes);
  }

  private priorityNote(note: any, noteIndex: number, n: number) {
    const priorityNotesToLocalStorage = JSON.parse(localStorage.reminder).map(
      (item: any, itemIndex: number) => {
        if (noteIndex === itemIndex) item._priority = n;
        return item;
      }
    );

    localStorage.reminder = JSON.stringify(priorityNotesToLocalStorage);
    this.notes = this.store.reminder.getNotes("reminder");
  }

  private addNote() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      if (localStorage.isAuthOrganizer == "true") {
        console.log("success registered");
        return;
      }
      const reminder: INote = new Reminder(
        this.taskTitle,
        this.taskDescription,
        this.pin,
        this.groupNameSelected,
        this.datePicker,
        this.timePicker,
        this.done
      );
      this.store.reminder.saveLocal(reminder, "reminder");
      this.$data.taskTitle = "";
      this.$data.taskDescription = "";
      this.notes = this.store.note.getLocal("reminder");
    } else if (this.$v.$invalid) {
      console.log("not success");
    }
  }
  created() {
    this.$v.$touch();
    this.notes = this.store.reminder.getLocal("reminder");
    this.groupNames = JSON.parse(localStorage.notesReminderNames);
  }
}
</script>

<style lang="scss" scoped>
.note-wrapper {
  align-self: flex-start;
  display: flex;
  width: 100%;
}
.email-forgot {
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 0.5s;
  text-align: center;
  &:hover {
    text-decoration-color: $primary;
  }
}
</style>
