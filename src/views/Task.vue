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
                <v-list-item @click="sortByPriority" class="pointer">
                  <v-list-item-title>{{
                    $t("Sort by priority")
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="groupWrapper = true" class="pointer">
                  <v-list-item-title>{{ $t("Add group") }}</v-list-item-title>
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
            :disabled="this.$v.$invalid"
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
              <v-card-actions class="d-flex align-center mx-4"
                >{{
                  $t(
                    note._priority === 1
                      ? "Low"
                      : note._priority === 2
                      ? "Medium"
                      : "High"
                  )
                }}
                <v-radio-group v-model="radioGroup" class="ml-2">
                  <div class="v-radio-group-inner d-flex">
                    <v-radio
                      v-for="n in 3"
                      :key="n"
                      :value="`${noteIndex}` + `${n}`"
                      class="ma-0"
                      :name="`noteIndex${noteIndex}`"
                      :color="n === 1 ? 'green' : n === 2 ? 'yellow' : 'red'"
                      @click="priorityNote(note, noteIndex, n)"
                    ></v-radio>
                  </div>
                </v-radio-group>
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
              <v-card-actions class="d-flex align-center mx-4"
                >{{
                  $t(
                    note._priority === 1
                      ? "Low"
                      : note._priority === 2
                      ? "Medium"
                      : "High"
                  )
                }}
                <v-radio-group v-model="radioGroup" class="ml-2">
                  <div class="v-radio-group-inner d-flex">
                    <v-radio
                      v-for="n in 3"
                      :key="n"
                      :value="`${noteIndex}` + `${n}`"
                      class="ma-0"
                      :name="`noteIndex${noteIndex}`"
                      :color="n === 1 ? 'green' : n === 2 ? 'yellow' : 'red'"
                      @click="priorityNote(note, noteIndex, n)"
                    ></v-radio>
                  </div>
                </v-radio-group>
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
            <v-card-actions class="d-flex align-center justify-end pt-0">
              {{
                $t(
                  note._priority === 1
                    ? "Low"
                    : note._priority === 2
                    ? "Medium"
                    : "High"
                )
              }}
              <v-radio-group v-model="radioGroup" class="ml-2">
                <div class="v-radio-group-inner d-flex">
                  <v-radio
                    v-for="n in 3"
                    :key="n"
                    :value="`${noteIndex}` + `${n}`"
                    :name="`noteIndex${noteIndex}`"
                    :color="n === 1 ? 'green' : n === 2 ? 'yellow' : 'red'"
                    class="ma-0"
                    @click="priorityNote(note, noteIndex, n)"
                  ></v-radio>
                </div>
              </v-radio-group>
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
          <div v-else>There are no notes</div>
        </div>
      </draggable>
      <span class="d-none">{{ notesGet }}</span>
      <span class="d-none">{{ notesPriorityGet }}</span>
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
  private priority: number = 1;
  private notes: INote[] = [];
  private radioGroup: string = "";

  private get rulesTaskDescriptionInput(): Array<
    string | (Validation & ValidationProperties<any> & ValidationEvaluation)
  > {
    return [
      (this.$v.taskDescription.$dirty && this.$v.taskDescription.required) ||
        `${this.$t("This field is required")}.`,
    ];
  }

  private sortByPriority() {
    this.notes = this.store.task.sortByPriority();
    localStorage.task = JSON.stringify(this.notes);
  }

  private deleteNote(note: INote) {
    const filteredNoteArray: INote[] = this.store.task
      .getNotes("task")
      .filter(
        (findNote: INote) => JSON.stringify(findNote) !== JSON.stringify(note)
      );
    this.notes = filteredNoteArray;
    this.store.task.setNotesLocal("task", filteredNoteArray);
  }
  private addGroupName() {
    this.$data.groupWrapper = false;
    this.groupNames.push(this.groupName);
    this.groupName = "";
    localStorage.notesTaskNames = JSON.stringify(this.groupNames);
  }
  private sortByGroupName() {
    this.notes = this.store.task.sortByGroupName("task");
  }
  private checkMove(e: any) {
    window.console.log("Future index: ", e.draggedContext);
    console.log(this.notes);
  }

  public get notesGet(): INote[] {
    this.saveChanges(this.notes);
    return this.notes;
  }

  public get notesPriorityGet(): string {
    return this.radioGroup;
  }

  private saveChanges(notes: INote[]) {
    localStorage.task = JSON.stringify(notes);
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
    const pinNotesToLocalStorage = JSON.parse(localStorage.task).map(
      (item: any, itemIndex: number) => {
        if (noteIndex === itemIndex)
          item._pin == false ? (item._pin = true) : (item._pin = false);
        return item;
      }
    );

    localStorage.task = JSON.stringify(pinNotesToLocalStorage);
    this.notes = this.store.task.getLocal("task");
  }

  private priorityNote(note: any, noteIndex: number, n: number) {
    const priorityNotesToLocalStorage = JSON.parse(localStorage.task).map(
      (item: any, itemIndex: number) => {
        if (noteIndex === itemIndex) item._priority = n;
        return item;
      }
    );

    localStorage.task = JSON.stringify(priorityNotesToLocalStorage);
    this.notes = this.store.task.getNotes("task");
  }

  private addNote() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      if (localStorage.isAuthOrganizer == "true") {
        console.log("success registered");
      }
      const task: INote = new Task(
        this.taskTitle,
        this.taskDescription,
        this.pin,
        this.groupNameSelected,
        this.priority,
        this.done
      );
      this.store.task.saveLocal(task, "task");
      this.$data.taskTitle = "";
      this.$data.taskDescription = "";
      this.notes = this.store.note.getLocal("task");
    } else if (this.$v.$invalid) {
      console.log("not success");
    }
  }
  created() {
    this.$v.$touch();
    this.notes = this.store.task.getLocal("task");
    this.groupNames = JSON.parse(localStorage.notesTaskNames);
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
