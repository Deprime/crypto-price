<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useI18n } from "vue-i18n";
  import VueFeather from 'vue-feather';

  // Stores
  import { useSettingsStore } from '@/stores/settings';
  import { useTickerStore } from '@/stores/ticker';

    // Components
  import { Button, Input } from '@/components/ui';

  const { t } = useI18n();
  const { closeSettings } = useSettingsStore();
  const { perPage, list } = storeToRefs(useTickerStore());

  // Data
  const allowClear = ref(false);

  /**
   * Clear ticker list
   */
  const onClearTickerList = (): void => {
    if (allowClear.value) {
      allowClear.value = !allowClear.value;
      return;
    }
    allowClear.value = !allowClear.value;
  }

  /**
   * Cancel clear
   */
  const onCancelClear = (): void => {
    allowClear.value = false;
  }
</script>

<template>
  <section>
    <div
      class="fixed z-20 top-0 h-screen w-screen backdrop-blur-sm bg-black/30"
      @click="closeSettings"
    ></div>

    <aside class="fixed z-30 top-0 bottom-0 right-0 bg-white w-full md:w-2/4 lg:w-1/4 box-s">
      <header class="relative font-bold p-4 border-b">
        {{ $t('settings.title') }}

        <VueFeather
          @click="closeSettings"
          class="icon icon-default absolute top-4 right-4"
          size="26"
          type="x"
        />
      </header>
      <section class="p-4">
        <!--
        <div class="pb-4">
          <h4 class="font-semibold mb-2">
            {{ $t('settings.language') }}
          </h4>
          <select class="w-full border p-3 rounded-md">
            <option value="ru">Ru</option>
            <option value="en">En</option>
          </select>
        </div>
        -->

        <div class="pb-4">
          <h4 class="font-semibold mb-2">
            {{ $t('settings.results_per_page') }}
          </h4>
          <Input v-model="perPage" native-type="number" />
        </div>

        <!--
        <template v-if="list.length > 0">
          <hr class="my-4"/>

          <div class="pb-4">
            <h4 class="font-semibold mb-2">
              {{ $t('settings.clear_dashboard') }}
            </h4>

            <div class="pb-4 text-gray-600">
              {{ $t('settings.clear_info', [list.length]) }}
            </div>

            <footer class="flex flex-row">
              <Button
                variant="danger"
                class="basis-1/2 mr-1"
                @click="onClearTickerList"
              >
                {{ $t(`actions.${allowClear ? 'approve' : 'clear' }`)}}
              </Button>

              <Button
                v-if="allowClear"
                @click="onCancelClear"
                class="basis-1/2 ml-1"
              >
                {{ $t('actions.cancel') }}
              </Button>
            </footer>

          </div>
        </template>
        -->
      </section>

    </aside>
  </section>
</template>
